<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Ulid\Ulid;

/**
 * Guest
 *
 * @ORM\Table(name="guest")
 * @ORM\Entity
 */
class Guest
{
    /**
     * @var integer
     *
     * @ORM\Column(name="guest_id", type="string", length=26)
     * @ORM\Id
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="RSVP")
     * @ORM\JoinColumn(name="rsvp_id", referencedColumnName="rsvp_id")
     */
    private $rsvp;

    /**
     * @var string
     *
     * @ORM\Column(name="first_name", type="string", length=255)
     * @Assert\Length(
     *      max = "255"
     * )
     */
    private $firstName;

    /**
     * @var string
     *
     * @ORM\Column(name="last_name", type="string", length=255)
     * @Assert\Length(
     *      max = "255"
     * )
     */
    private $lastName;

    public function __construct(array $params = [])
    {
        // @TODO Add a Ulid method!
        $this->id = (string) Ulid::generate();
    }

    /**
     * Get id
     *
     * @return string
     */
    public function getId() : string
    {
        return $this->id;
    }

    /**
     * Set rsvp
     *
     * @param RSVP|null $rsvp
     * @return Guest
     */
    public function setRsvp(?RSVP $rsvp) : self
    {
        $this->rsvp = $rsvp;

        return $this;
    }

    /**
     * Get rsvp
     *
     * @return RSVP
     */
    public function getRsvp() : RSVP
    {
        return $this->rsvp;
    }

    /**
     * Set First Name
     *
     * @Groups("create")
     *
     * @param string $firstName
     * @return Guest
     */
    public function setFirstName(string $firstName) : self
    {
        $this->firstName = $firstName;

        return $this;
    }

    /**
     * Get First Name
     *
     * @Groups("read")
     *
     * @return string
     */
    public function getFirstName() : string
    {
        return $this->firstName;
    }

    /**
     * Set Last Name
     *
     * @Groups("create")
     *
     * @param string $last_name
     * @return Guest
     */
    public function setLastName(string $lastName) : self
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * Get Last Name
     *
     * @Groups("read")
     *
     * @return string
     */
    public function getLastName() : string
    {
        return $this->lastName;
    }
}
